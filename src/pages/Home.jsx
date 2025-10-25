import { FaYoutube, FaSoundcloud, FaSpotify, FaApple, FaEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <h2>Welcome to G's' Music</h2>
      <section className="about-section">
        <h3 className="about-title">About Me</h3>
        <img
          src="https://jxkrcweqxwysxydzxgzy.supabase.co/storage/v1/object/public/Images/About%20me%20Gs%20website.png"
          alt="G's' about me"
          loading="lazy"
          className="about-image"
        />
      </section>

      <section className="latest-releases-section">
        <h3 className="latest-releases-title">Latest Release</h3>
        <p>Check out my latest release, Mamad Sessions!</p>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/album/1E25COIv2t8iFM4vIOeEzT?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <p>The stories and more on the Releases page!</p>
      </section>

      <section className="contact-section">
        <h3 className="contact-title">Social Media</h3>

        <nav className="social-bar" aria-label="Social links">
          <a
            className="social-link"
            href="https://youtube.com/@prod-by-gs?si=f4l0QtQM2UHo_KJ8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube — opens in a new tab"
            title="YouTube"
          >
            <FaYoutube className="social-icon" />
          </a>

          <a
            className="social-link"
            href="https://on.soundcloud.com/5aIJ3R9WNlWciGdB5J"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud — opens in a new tab"
            title="SoundCloud"
          >
            <FaSoundcloud className="social-icon" />
          </a>

          <a
            className="social-link"
            href="https://open.spotify.com/artist/5mhArhCoknzt3Waivpmz0c?si=9653983c339445ba"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify — opens in a new tab"
            title="Spotify"
          >
            <FaSpotify className="social-icon" />
          </a>

          <a
            className="social-link"
            href="https://music.apple.com/us/artist/gs/1501230398"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music — opens in a new tab"
            title="Apple Music"
          >
            <FaApple className="social-icon" />
          </a>

          <a
            className="social-link"
            href="mailto:gal.uritsky@icloud.com"
            aria-label="Email"
            title="Email"
          >
            <FaEnvelope className="social-icon" />
          </a>
        </nav>
        <h3>Caution: The release "Mood" on apple music isn't mine at all.. I'm working on putting it down.</h3>
      </section>
    </div>
  );
}