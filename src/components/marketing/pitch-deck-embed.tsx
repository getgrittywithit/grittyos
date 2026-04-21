interface PitchDeckEmbedProps {
  embedUrl?: string;
}

export function PitchDeckEmbed({ embedUrl }: PitchDeckEmbedProps) {
  // If no embed URL is provided, show a placeholder
  if (!embedUrl) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <span className="text-3xl font-bold text-primary">G</span>
          </div>
          <h3 className="text-xl font-semibold">Pitch Deck</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Our investor pitch deck will be embedded here. Contact us for early access
            to our investor materials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-muted">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        allowFullScreen
        className="absolute inset-0"
        title="GrittyOS Pitch Deck"
      />
    </div>
  );
}
