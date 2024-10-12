import ButtonCard from "@/components/button-card/button-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ButtonCard title="Users" iconName="account_circle" />

      <ButtonCard title="Productssssssss" className="yellow" iconName="inventory_2" />
    </main>
  );
}
