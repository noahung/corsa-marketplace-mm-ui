
import React, { useState } from 'react';
import { GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CompareButtonProps {
  vehicleId: string;
  vehicleData: any;
}

const CompareButton = ({ vehicleId, vehicleData }: CompareButtonProps) => {
  const [isInCompare, setIsInCompare] = useState(false);
  const { toast } = useToast();

  const handleCompareToggle = () => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    if (isInCompare) {
      // Remove from compare
      const updatedList = compareList.filter((item: any) => item.id !== vehicleId);
      localStorage.setItem('compareList', JSON.stringify(updatedList));
      setIsInCompare(false);
      
      toast({
        title: "Removed from comparison",
        description: "Vehicle removed from compare list.",
      });
    } else {
      // Add to compare (max 3 items)
      if (compareList.length >= 3) {
        toast({
          title: "Compare limit reached",
          description: "You can compare up to 3 vehicles at once.",
          variant: "destructive",
        });
        return;
      }
      
      const updatedList = [...compareList, { id: vehicleId, ...vehicleData }];
      localStorage.setItem('compareList', JSON.stringify(updatedList));
      setIsInCompare(true);
      
      toast({
        title: "Added to comparison",
        description: `Vehicle added to compare list (${updatedList.length}/3).`,
      });
    }
  };

  return (
    <Button
      onClick={handleCompareToggle}
      size="sm"
      variant={isInCompare ? "default" : "outline"}
      className="flex items-center gap-2"
    >
      <GitCompare className="w-4 h-4" />
      {isInCompare ? 'Remove' : 'Compare'}
    </Button>
  );
};

export default CompareButton;
