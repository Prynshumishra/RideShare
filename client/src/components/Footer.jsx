import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card">
      <div className="page-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h2 className="font-display text-xl font-bold text-primary">RideShare</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              Share seats, split costs, and make every trip smarter. RideShare helps commuters coordinate trusted rides with clear pricing and fewer empty seats.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-secondary px-3 py-1">Reliable</span>
              <span className="rounded-full bg-secondary px-3 py-1">Affordable</span>
              <span className="rounded-full bg-secondary px-3 py-1">Community-first</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-display text-base font-semibold text-foreground">Contact</h3>
            <p className="text-muted-foreground">Phone: 7537543210</p>
            <a
              href="mailto:rideshare757@gmail.com"
              className="block text-muted-foreground transition-colors hover:text-primary"
            >
              rideshare757@gmail.com
            </a>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-muted-foreground transition-colors hover:text-primary"
            >
              India
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-base font-semibold text-foreground">Social</h3>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="/"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Follow us for ride updates and travel tips.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} RideShare. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="transition-colors hover:text-foreground">FAQ</Link>
            <Link to="/" className="transition-colors hover:text-foreground">Privacy Policy</Link>
            <Link to="/" className="transition-colors hover:text-foreground">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer