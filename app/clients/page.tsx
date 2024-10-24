import TopBar from "@/components/top-bar/top-bar";


export default function Clients() {
  return (
    <main className="main-content">
      <TopBar
        redirectBackLink="/"
        title="Clients"
        hasSearch={true} />
    </main>
  )
}