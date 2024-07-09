export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="w-full flex justify-center mt-12">
            {children}
      </div>
    );
  }