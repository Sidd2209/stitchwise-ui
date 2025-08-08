import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FabricRoll, fetchFabricRolls } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const statusVariant = (s: FabricRoll["status"]) => {
  switch (s) {
    case "Available":
      return "secondary" as const;
    case "In Use":
      return "default" as const;
    case "Reserved":
      return "outline" as const;
  }
};

const FabricRolls = () => {
  const { toast } = useToast();
  const [rolls, setRolls] = useState<FabricRoll[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FabricRoll | null>(null);

  useEffect(() => {
    document.title = "Fabric Rolls • Apparel Cutting Room";
  }, []);

  useEffect(() => {
    fetchFabricRolls().then(setRolls).catch(() =>
      toast({ title: "Error", description: "Failed to fetch rolls" })
    );
  }, [toast]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: FabricRoll = {
      id: (form.get("id") as string) || `R-${Date.now()}`,
      fabricType: (form.get("fabricType") as string) || "",
      length: Number(form.get("length")) || 0,
      status: (form.get("status") as FabricRoll["status"]) || "Available",
    };

    setRolls((prev) => {
      const exists = prev.find((r) => r.id === next.id);
      if (exists) {
        return prev.map((r) => (r.id === next.id ? next : r));
      }
      return [next, ...prev];
    });

    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (r: FabricRoll) => {
    setEditing(r);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setRolls((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Fabric Roll Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="rounded-full">
              <Plus className="h-4 w-4" /> Add Roll
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Roll" : "Add Roll"}</DialogTitle>
            </DialogHeader>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">Roll ID</Label>
                  <Input id="id" name="id" defaultValue={editing?.id} placeholder="R-1004" />
                </div>
                <div>
                  <Label htmlFor="fabricType">Fabric Type</Label>
                  <Input id="fabricType" name="fabricType" defaultValue={editing?.fabricType} placeholder="Denim" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="length">Length (m)</Label>
                  <Input id="length" name="length" type="number" step="0.1" defaultValue={editing?.length} />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select id="status" name="status" defaultValue={editing?.status} className="h-10 rounded-md border bg-background px-3">
                    <option>Available</option>
                    <option>In Use</option>
                    <option>Reserved</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="default">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll ID</TableHead>
              <TableHead>Fabric Type</TableHead>
              <TableHead>Length (m)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolls.map((r) => (
              <TableRow key={r.id} className="odd:bg-muted/30">
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.fabricType}</TableCell>
                <TableCell>{r.length}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="soft" size="sm" onClick={() => handleEdit(r)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(r.id)}>
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

export default FabricRolls;
