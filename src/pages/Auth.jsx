import AuthCountainer from "../features/Authenticetion/AuthCountainer";

export default function Auth() {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <AuthCountainer />
      </div>
    </div>
  );
}
