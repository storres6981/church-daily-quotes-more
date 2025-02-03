import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BibleBook } from "@/types/bible";

interface BookListProps {
  books: BibleBook[];
  selectedBook: BibleBook | null;
  onSelectBook: (book: BibleBook) => void;
}

const BookList = ({ books, selectedBook, onSelectBook }: BookListProps) => {
  return (
    <div className="md:col-span-3">
      <h3 className="font-semibold mb-4">Select a Book</h3>
      <ScrollArea className="h-[400px]">
        <div className="space-y-1">
          {books.map((book) => (
            <Button
              key={book.id}
              variant={selectedBook?.id === book.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectBook(book)}
            >
              {book.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BookList;