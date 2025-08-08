import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { Spread, fetchSpreads } from "@/services/api";

const SpreadPlanning = () => {
  const [spreads, setSpreads] = useState<Spread[]>([]);

  useEffect(() => {
    document.title = "Spread Planning • Apparel Cutting Room";
    fetchSpreads().then(setSpreads);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Spread = {
      id: `S-${Date.now()}`,
      fabricType: (form.get("fabricType") as string) || "",
      spreadLength: Number(form.get("spreadLength")) || 0,
      plies: Number(form.get("plies")) || 0,
    };
    setSpreads((prev) => [next, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Spread Planning</h1>

      <Card className="p-4 max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="spreadLength">Spread Length (m)</Label>
              <Input id="spreadLength" name="spreadLength" type="number" step="0.1" placeholder="50" />
            </div>
            <div>
              <Label htmlFor="plies">Number of Plies</Label>
              <Input id="plies" name="plies" type="number" placeholder="20" />
            </div>
            <div>
              <Label htmlFor="fabricType">Fabric Type</Label>
              <Input id="fabricType" name="fabricType" placeholder="Cotton" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="gradient" className="rounded-full">
              <Plus className="h-4 w-4" /> Add Spread
            </Button>
          </div>
        </form>
      </Card>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Spread Length (m)</TableHead>
              <TableHead>Plies</TableHead>
              <TableHead>Fabric Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spreads.map((s) => (
              <TableRow key={s.id} className="odd:bg-muted/30">
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.spreadLength}</TableCell>
                <TableCell>{s.plies}</TableCell>
                <TableCell>{s.fabricType}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => setSpreads((prev) => prev.filter((x) => x.id !== s.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default SpreadPlanning;
