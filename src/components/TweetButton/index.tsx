export const TweetButton: React.VFC = () => {
  return (
    <a
      className="twitter-share-button"
      data-size="large"
      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
    >
      Tweet
    </a>
  );
};
