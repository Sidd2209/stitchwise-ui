import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Marker, fetchMarkers } from "@/services/api";

const MarkerPlanning = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    document.title = "Marker Planning • Apparel Cutting Room";
    fetchMarkers().then(setMarkers);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Marker = {
      id: `M-${Date.now()}`,
      fabricType: (form.get("fabricType") as string) || "",
      length: Number(form.get("length")) || 0,
      layout: (form.get("layout") as string) || "",
    };
    setMarkers((prev) => [next, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Marker Planning</h1>

      <Card className="p-4 max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="length">Marker Length (m)</Label>
              <Input id="length" name="length" type="number" step="0.01" placeholder="1.8" />
            </div>
            <div>
              <Label htmlFor="fabricType">Fabric Type</Label>
              <Input id="fabricType" name="fabricType" placeholder="Denim" />
            </div>
            <div>
              <Label htmlFor="layout">Layout</Label>
              <Input id="layout" name="layout" placeholder="Straight" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="gradient" className="rounded-full">
              <Plus className="h-4 w-4" /> Add Marker
            </Button>
          </div>
        </form>
      </Card>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Length (m)</TableHead>
              <TableHead>Fabric Type</TableHead>
              <TableHead>Layout</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markers.map((m) => (
              <TableRow key={m.id} className="odd:bg-muted/30">
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.length}</TableCell>
                <TableCell>{m.fabricType}</TableCell>
                <TableCell>{m.layout}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="soft" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setMarkers((prev) => prev.filter((x) => x.id !== m.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default MarkerPlanning;
