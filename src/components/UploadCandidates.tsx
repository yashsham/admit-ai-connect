import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';

interface Candidate {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  course?: string;
}

interface UploadCandidatesProps {
  campaignId?: string;
  onUploadComplete?: (candidates: Candidate[]) => void;
}

export const UploadCandidates = ({ campaignId, onUploadComplete }: UploadCandidatesProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [preview, setPreview] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseFile(selectedFile);
    }
  };

  const parseFile = async (file: File) => {
    try {
      const text = await file.text();
      let parsedData: Candidate[] = [];

      if (file.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',');
            const candidate: any = {};
            
            headers.forEach((header, index) => {
              const value = values[index]?.trim() || '';
              if (header.includes('name')) candidate.name = value;
              else if (header.includes('phone') || header.includes('mobile')) candidate.phone = value;
              else if (header.includes('email')) candidate.email = value;
              else if (header.includes('city')) candidate.city = value;
              else if (header.includes('course')) candidate.course = value;
            });

            if (candidate.name && candidate.phone) {
              parsedData.push(candidate);
            }
          }
        }
      }

      setCandidates(parsedData);
      setPreview(true);
      
      toast({
        title: "File parsed successfully",
        description: `Found ${parsedData.length} valid candidates`,
      });
    } catch (error) {
      toast({
        title: "Error parsing file",
        description: "Please check your file format and try again",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!candidates.length || !user) return;

    setUploading(true);
    try {
      // If campaignId is provided, add candidates to that campaign
      // Otherwise, we'll need to create a campaign first
      const candidatesToInsert = candidates.map(candidate => ({
        ...candidate,
        campaign_id: campaignId || 'temp', // We'll handle this better when integrating with campaign creation
      }));

      const { error } = await supabase
        .from('candidates')
        .insert(candidatesToInsert);

      if (error) throw error;

      toast({
        title: "Candidates uploaded successfully",
        description: `${candidates.length} candidates have been added`,
      });

      onUploadComplete?.(candidates);
      setCandidates([]);
      setFile(null);
      setPreview(false);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground">Upload Candidates</h3>
            <p className="text-sm text-muted-foreground">
              Upload a CSV file with candidate information
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">CSV File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Required columns: Name, Phone. Optional: Email, City, Course
            </p>
          </div>

          {file && (
            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{file.name}</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>
      </Card>

      {preview && candidates.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-card-foreground">Preview</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{candidates.length} candidates found</span>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Phone</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">City</th>
                    <th className="text-left p-2">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.slice(0, 10).map((candidate, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{candidate.name}</td>
                      <td className="p-2">{candidate.phone}</td>
                      <td className="p-2">{candidate.email || '-'}</td>
                      <td className="p-2">{candidate.city || '-'}</td>
                      <td className="p-2">{candidate.course || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {candidates.length > 10 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ... and {candidates.length - 10} more candidates
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
              variant="hero"
            >
              {uploading ? "Uploading..." : `Upload ${candidates.length} Candidates`}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
