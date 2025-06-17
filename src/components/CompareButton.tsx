
import React, { useState, useEffect } from 'react';
import { GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CompareButtonProps {
  vehicleId: string;
  vehicleData: any;
}

const CompareButton = ({ vehicleId, vehicleData }: CompareButtonProps) => {
  const [isInCompare, setIsInCompare] = useState(false);
  const [compareCount, setCompareCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    setIsInCompare(compareList.some((item: any) => item.id === vehicleId));
    setCompareCount(compareList.length);
  }, [vehicleId]);

  const handleCompareToggle = () => {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    if (isInCompare) {
      const updatedList = compareList.filter((item: any) => item.id !== vehicleId);
      localStorage.setItem('compareList', JSON.stringify(updatedList));
      setIsInCompare(false);
      setCompareCount(updatedList.length);
      
      toast({
        title: "Removed from comparison",
        description: "Vehicle removed from compare list.",
      });
    } else {
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
      setCompareCount(updatedList.length);
      
      toast({
        title: "Added to comparison",
        description: `Vehicle added to compare list (${updatedList.length}/3).`,
      });
    }

    // Dispatch custom event to update compare page
    window.dispatchEvent(new Event('compareListUpdated'));
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
