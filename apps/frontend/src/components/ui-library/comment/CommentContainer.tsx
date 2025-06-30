const CommentContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-6">{children}</div>;
};

export default CommentContainer;
