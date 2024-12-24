import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="border-b bg-gradient-to-r from-blue-50 to-blue-100 shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
              <AvatarFallback>FBR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-semibold">
                Form Builder
              </span>
              <span className="hidden sm:inline-block text-xs text-muted-foreground">
                Interactive question creation platform.
              </span>
            </div>
          </div>

          <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;