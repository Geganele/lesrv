
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactSectionProps {
  formData: {
    visit_url: string;
    agent_name: string;
    agent_title: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactSection = ({ formData, handleChange }: ContactSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="visit_url">Contact URL/Phone</Label>
        <Input 
          id="visit_url" 
          name="visit_url" 
          value={formData.visit_url} 
          onChange={handleChange} 
          placeholder="e.g., tel:+26657123456 or website URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent_name">Therapist Name</Label>
        <Input 
          id="agent_name" 
          name="agent_name" 
          value={formData.agent_name} 
          onChange={handleChange} 
          placeholder="e.g., Sarah Johnson"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent_title">Therapist Title</Label>
        <Input 
          id="agent_title" 
          name="agent_title" 
          value={formData.agent_title} 
          onChange={handleChange} 
          placeholder="e.g., Licensed Massage Therapist"
        />
      </div>
    </>
  );
};

export default ContactSection;
