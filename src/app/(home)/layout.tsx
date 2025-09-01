import BottomNavbar from "@/components/ui/BottomNav/BottomNav";


export default function HomeLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="">
      {children}

      <BottomNavbar />
    </main>
  );
}