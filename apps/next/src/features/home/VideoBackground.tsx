const VideoBackground: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen">
      <video autoPlay muted loop className="fixed min-h-full min-w-full brightness-50 z-10">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" />
      </video>
      <div className="z-30 m-auto">{children}</div>
    </div>
  );
};

export default VideoBackground;
