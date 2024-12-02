import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ClubSettingsProps {
  club: {
    name: string;
    description: string;
    imageUrl?: string;
  };
  onUpdate: (data: { name: string; description: string; imageUrl?: string }) => void;
}

export function ClubSettings({ club, onUpdate }: ClubSettingsProps) {
  const [name, setName] = React.useState(club.name);
  const [description, setDescription] = React.useState(club.description);
  const [imageUrl, setImageUrl] = React.useState(club.imageUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name, description, imageUrl });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Club Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Club Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}