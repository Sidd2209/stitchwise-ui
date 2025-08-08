import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Reports = () => {
  useEffect(() => {
    document.title = "Reports • Apparel Cutting Room";
  }, []);

  const barData = {
    labels: ["Denim", "Cotton", "Polyester", "Linen"],
    datasets: [
      {
        label: "Fabric Usage (m)",
        data: [320, 280, 210, 160],
        backgroundColor: "hsl(var(--primary) / 0.8)",
      },
    ],
  };

  const pieData = {
    labels: ["Utilized", "Wastage"],
    datasets: [
      {
        data: [96, 4],
        backgroundColor: [
          "hsl(var(--accent) / 0.9)",
          "hsl(var(--destructive) / 0.9)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: { display: true, text: "Fabric Usage by Type" },
    },
    animation: { duration: 600 },
  };

  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <Bar data={barData} options={options} />
        </Card>
        <Card className="p-4">
          <Pie data={pieData} options={{ plugins: { legend: { position: "bottom" } }, animation: { duration: 700 } }} />
        </Card>
      </div>
    </section>
  );
};

export default Reports;
