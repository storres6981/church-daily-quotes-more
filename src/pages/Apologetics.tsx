import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

interface ApologeticsEntry {
  id: string;
  topic: string;
  category: string;
  description: string;
  references: string[];
}

const mockData: ApologeticsEntry[] = [
  {
    id: '1',
    topic: 'Existence of God',
    category: 'Philosophical Arguments',
    description: 'Classical arguments for God\'s existence including cosmological, teleological, and moral arguments.',
    references: ['Romans 1:20', 'Psalm 19:1']
  },
  {
    id: '2',
    topic: 'Problem of Evil',
    category: 'Theological Discussions',
    description: 'Addressing why a good God allows evil and suffering in the world.',
    references: ['James 1:13-14', 'Romans 8:28']
  },
  // Add more mock data as needed
];

const Apologetics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredData = mockData.filter(entry => {
    const matchesSearch = entry.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = !selectedLetter || entry.topic.charAt(0).toUpperCase() === selectedLetter;
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Apologetics & Evangelism</h1>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
            className={`px-3 py-1 rounded ${
              selectedLetter === letter 
                ? 'bg-primary text-white' 
                : 'bg-accent hover:bg-accent/80'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[600px] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Biblical References</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.topic}</TableCell>
                <TableCell>{entry.category}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{entry.references.join(', ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Apologetics;