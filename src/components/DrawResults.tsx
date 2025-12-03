import { Team } from '@/data/teams';
import { GroupDisplay } from './GroupDisplay';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw, Share2, FileText, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DrawResultsProps {
  groups: { [key: string]: Team[] };
  tournamentName: string;
  onReset: () => void;
}

export const DrawResults = ({ groups, tournamentName, onReset }: DrawResultsProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!resultsRef.current) return;
    
    setIsExporting(true);
    toast.loading('Gerando PDF...', { id: 'pdf-export' });

    try {
      const element = resultsRef.current;
      
      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#0a0f1a',
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(24);
      pdf.setTextColor(234, 179, 8); // Gold color
      pdf.text(tournamentName, 105, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(148, 163, 184); // Muted color
      pdf.text('Resultado do Sorteio', 105, 28, { align: 'center' });
      pdf.text(new Date().toLocaleDateString('pt-BR'), 105, 34, { align: 'center' });
      
      // Add image below title
      let position = 40;
      let heightLeft = imgHeight;
      
      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - position);
      
      // Add more pages if needed
      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save PDF
      pdf.save(`sorteio-${tournamentName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      toast.success('PDF gerado com sucesso!', { id: 'pdf-export' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Erro ao gerar PDF', { id: 'pdf-export' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportText = async () => {
    try {
      let text = `🏆 ${tournamentName} - Resultado do Sorteio\n`;
      text += `📅 ${new Date().toLocaleDateString('pt-BR')}\n\n`;
      
      Object.entries(groups).forEach(([groupName, teams]) => {
        text += `━━━━━━━━━━━━━━━━━━━━\n`;
        text += `📋 GRUPO ${groupName}\n`;
        text += `━━━━━━━━━━━━━━━━━━━━\n`;
        teams.forEach((team, index) => {
          text += `  ${index + 1}. ${team.flag} ${team.name} (${team.shortName})\n`;
        });
        text += '\n';
      });
      
      await navigator.clipboard.writeText(text);
      toast.success('Resultado copiado para a área de transferência!');
    } catch {
      toast.error('Erro ao copiar resultado');
    }
  };

  const handleShare = async () => {
    const text = `🏆 ${tournamentName}\n\nConfira o resultado do sorteio!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: tournamentName, text });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Link copiado!');
    }
  };

  const groupEntries = Object.entries(groups);
  const totalTeams = groupEntries.reduce((acc, [, teams]) => acc + teams.length, 0);
  const teamsPerGroup = groupEntries[0]?.[1].length || 0;
  const gamesPerGroup = teamsPerGroup * (teamsPerGroup - 1) / 2;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
          Resultado do Sorteio
        </h2>
        <p className="text-muted-foreground text-lg">{tournamentName}</p>
        <p className="text-muted-foreground text-sm mt-1">
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button 
          onClick={handleExportPDF} 
          disabled={isExporting}
          className="btn-gold gap-2"
        >
          {isExporting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileText size={18} />
          )}
          Exportar PDF
        </Button>
        <Button onClick={handleExportText} variant="outline" className="gap-2">
          <Download size={18} />
          Copiar Texto
        </Button>
        <Button onClick={handleShare} variant="outline" className="gap-2">
          <Share2 size={18} />
          Compartilhar
        </Button>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCcw size={18} />
          Novo Sorteio
        </Button>
      </div>

      {/* Groups grid - this is what gets exported to PDF */}
      <div 
        ref={resultsRef} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
      >
        {groupEntries.map(([groupName, teams], index) => (
          <div
            key={groupName}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <GroupDisplay
              groupName={groupName}
              teams={teams}
              revealedCount={teams.length}
            />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="card-tournament text-center">
        <h3 className="font-display text-xl text-gradient-pitch mb-4">Estatísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-3xl font-display text-gradient-gold">
              {groupEntries.length}
            </p>
            <p className="text-muted-foreground text-sm">Grupos</p>
          </div>
          <div>
            <p className="text-3xl font-display text-gradient-pitch">
              {totalTeams}
            </p>
            <p className="text-muted-foreground text-sm">Seleções</p>
          </div>
          <div>
            <p className="text-3xl font-display text-foreground">
              {teamsPerGroup}
            </p>
            <p className="text-muted-foreground text-sm">Por Grupo</p>
          </div>
          <div>
            <p className="text-3xl font-display text-secondary">
              {gamesPerGroup * groupEntries.length}
            </p>
            <p className="text-muted-foreground text-sm">Jogos na Fase</p>
          </div>
        </div>
      </div>
    </div>
  );
};
