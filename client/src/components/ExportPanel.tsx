import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, FileSpreadsheet, FileText, Printer, Share2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { exportToPDF, exportToExcel, exportToCSV, printElement, ExportData } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  elementId?: string;
  data?: ExportData[];
  filename?: string;
  showPrint?: boolean;
  showShare?: boolean;
}

export function ExportPanel({ 
  elementId = 'main-content',
  data = [],
  filename = 'gaia-commons-export',
  showPrint = true,
  showShare = true
}: ExportPanelProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handlePDFExport = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(elementId, filename);
      toast({
        title: 'Export Complete',
        description: 'PDF has been downloaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Could not export to PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExcelExport = () => {
    if (data.length === 0) {
      toast({
        title: 'No Data',
        description: 'No data available to export.',
        variant: 'destructive',
      });
      return;
    }
    exportToExcel(data, filename);
    toast({
      title: 'Export Complete',
      description: 'Excel file has been downloaded successfully.',
    });
  };

  const handleCSVExport = () => {
    if (data.length === 0 || !data[0]?.data) {
      toast({
        title: 'No Data',
        description: 'No data available to export.',
        variant: 'destructive',
      });
      return;
    }
    exportToCSV(data[0].data, filename);
    toast({
      title: 'Export Complete',
      description: 'CSV file has been downloaded successfully.',
    });
  };

  const handlePrint = () => {
    printElement(elementId);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Gaia Commons Council Dashboard',
      text: 'Check out the Gaia Commons Council - One Vote, Forever Fed initiative',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied',
      description: 'Dashboard link copied to clipboard.',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting} data-testid="button-export-panel">
          <Download className="h-4 w-4 mr-2" />
          {t('common.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handlePDFExport} data-testid="menu-item-export-pdf">
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        {data.length > 0 && (
          <>
            <DropdownMenuItem onClick={handleExcelExport} data-testid="menu-item-export-excel">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCSVExport} data-testid="menu-item-export-csv">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export as CSV
            </DropdownMenuItem>
          </>
        )}
        {showPrint && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handlePrint} data-testid="menu-item-print">
              <Printer className="h-4 w-4 mr-2" />
              {t('common.print')}
            </DropdownMenuItem>
          </>
        )}
        {showShare && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShare} data-testid="menu-item-share">
              <Share2 className="h-4 w-4 mr-2" />
              {t('common.share')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
