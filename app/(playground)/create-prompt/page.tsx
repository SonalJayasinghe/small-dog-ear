"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { Architecture } from "@/lib/schema";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";

export default function PromptBuilder() {
  const [architectures, setArchitectures] = useState<Architecture[]>([]);
  const [selectedArchId, setSelectedArchId] = useState<string>("none");
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("python");
  const [modelType, setModelType] = useState("gpt-4");
  const [promptType] = useState("text-generation"); // fixed
  const [title, setTitle] = useState("Untitled Prompt");
  const [description, setDescription] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    axios.get("/api/v1/architecture").then((res) => {
      setArchitectures(res.data);
    });
  }, []);

  

  const selectedArchitecture = architectures.find(
    (a) => a._id === selectedArchId
  );

  const handleArchitectureChange = (newId: string) => {
    if (selectedArchId !== "none" && newId !== selectedArchId) {
      const confirmChange = confirm(
        "Changing the architecture will clear your current prompt. Proceed?"
      );
      if (!confirmChange) return;
      setPrompt(defaultPrompt);
    }
    setSelectedArchId(newId);
  };

  const handleSave = () => {
    const promptData = {
      promptName: title,
      promptDescription: description,
      promptType,
      modelType,
      language,
      architecture: selectedArchitecture?.name || "None",
      promptContent: prompt,
    };
    console.log("Prompt Saved:", promptData);
  };

    const defaultPrompt = `""" 
 Template
Enter your instructions here...
"""`;

  return (
    <div className="p-2">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2">Prompt Title</Label>
            <Input
              placeholder="Prompt Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2">Description</Label>
            <Textarea
              placeholder="Brief description of what this prompt does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-2">Select Architecture</Label>
              <Select
                value={selectedArchId}
                onValueChange={handleArchitectureChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Architecture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Architecture</SelectItem>
                  {architectures.map((arch) => (
                    <SelectItem key={arch._id} value={arch._id!}>
                      {arch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">Model Type</Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Model Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  {/* Add more languages here if needed */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2">Write Prompt</Label>
            <div className="h-[300px] border rounded-md overflow-hidden">
              <Editor
                height="100%"
                defaultValue={`prompt = """ Enter Your Prompt Here """`}
                language={language}
                value={prompt}
                onChange={(val) => setPrompt(val || "")}
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
              />
            </div>
          </div>

          <Button onClick={handleSave} className="mt-4">
            Save Prompt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
