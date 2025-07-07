"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

export default function PromptBuilder() {
  const [architectures, setArchitectures] = useState<Architecture[]>([]);
  const [selectedArchId, setSelectedArchId] = useState<string>("none");
  const [language, setLanguage] = useState("python");
  const [description, setDescription] = useState("");
  const [sectionPrompts, setSectionPrompts] = useState<Record<string, string>>(
    {}
  );
  const { theme } = useTheme();

  useEffect(() => {
    axios.get("/api/v1/architecture").then((res) => {
      setArchitectures(res.data);
    });
  }, []);

  const selectedArchitecture = architectures.find(
    (a) => a._id === selectedArchId
  );

  const handleSectionChange = (sectionName: string, value: string) => {
    setSectionPrompts((prev) => ({ ...prev, [sectionName]: value }));
  };

  const handleSave = () => {
    const promptData = {
      promptName: "Untitled Prompt",
      promptDescription: description,
      architecture: selectedArchitecture?.name || "None",
      language,
      promptSections: sectionPrompts,
    };
    console.log("Prompt Saved:", promptData);
  };

  return (
    <div className="p-2">
      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Select Architecture</Label>
              <Select value={selectedArchId} onValueChange={setSelectedArchId}>
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

            <div className="">
              <Label className="mb-2">Select Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  {/* <SelectItem value="typescript">TypeScript</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="mb-2">Description</Label>
            <Textarea
              placeholder="Brief description of what this prompt does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {selectedArchitecture && selectedArchitecture.sections.length > 0 && (
            <div className="space-y-6">
              {selectedArchitecture.sections.map((section) => (
                <div key={section.section_name}>
                  <Label className="mb-2">{section.section_name}</Label>
                  {section.section_description && (
                    <p className="text-muted-foreground text-sm mb-2">
                      {section.section_description}
                    </p>
                  )}
                  <div className="h-[250px] border rounded-md overflow-hidden">
                    <Editor
                      height="100%"
                      language={language}
                      value={sectionPrompts[section.section_name] || ""}
                      onChange={(value) =>
                        handleSectionChange(section.section_name, value || "")
                      }
                      theme={theme === "dark" ? "vs-dark" : "vs-light"}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!selectedArchitecture && (
            <div>
              <Label className="mb-2">Write Prompt</Label>
              <div className="h-[300px] border rounded-md overflow-hidden">
                <Editor
                  defaultValue={`prompt = """ Enter Your Prompt Here """`}
                  height="100%"
                  language={language}
                  value={sectionPrompts["default"] || ""}
                  onChange={(value) =>
                    handleSectionChange("default", value || "")
                  }
                  theme={theme === "dark" ? "vs-dark" : "vs-light"}
                />
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="mt-4">
            Save Prompt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
