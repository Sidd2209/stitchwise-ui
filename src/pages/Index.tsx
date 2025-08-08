import { useEffect, useState } from "react";
import { StatCard } from "@/components/shared/StatCard";
import { Layers, Package, Percent, Ruler } from "lucide-react";
import { fetchFabricRolls, fetchMarkers, fetchSpreads } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    rolls: 0,
    markers: 0,
    spreads: 0,
    wastage: 3.8,
  });

  useEffect(() => {
    document.title = "Dashboard • Apparel Cutting Room";
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [r, m, s] = await Promise.all([
        fetchFabricRolls(),
        fetchMarkers(),
        fetchSpreads(),
      ]);
      setStats({
        rolls: r.length,
        markers: m.length,
        spreads: s.length,
        wastage: 3.8,
      });
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main>
      <h1 className="sr-only">Apparel Cutting Room Dashboard</h1>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Fabric Rolls" value={stats.rolls} Icon={Package} variant="primary" />
          <StatCard title="Total Markers Planned" value={stats.markers} Icon={Ruler} variant="secondary" />
          <StatCard title="Total Spreads" value={stats.spreads} Icon={Layers} variant="accent" />
          <StatCard title="Wastage %" value={`${stats.wastage}%`} Icon={Percent} variant="muted" />
        </section>
      )}
    </main>
  );
};

export default Index;
