import ButtonCard from "@/components/button-card/button-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="test" style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <ButtonCard title="Users" iconName="account_circle" />

        <ButtonCard title="Products" className="yellow" iconName="inventory_2" />
      </div>
    </main >
  );
}
