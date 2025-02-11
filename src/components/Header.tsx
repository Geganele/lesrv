
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  session: any;
  onSignOut: () => Promise<void>;
}

const Header = ({ session, onSignOut }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Professional Massage Services
      </h1>
      {session ? (
        <Button onClick={onSignOut} variant="outline" className="shadow-sm">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      ) : (
        <Button onClick={() => navigate('/auth')} className="shadow-sm">
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Header;
