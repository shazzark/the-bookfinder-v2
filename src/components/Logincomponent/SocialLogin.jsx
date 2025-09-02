function SocialLogin({ handleGoogleLogin, isLoading }) {
  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        disabled={isLoading}
      >
        <span className="text-xl">📘</span>
        Sign in with Google
      </button>

      <button
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        disabled
      >
        <span className="text-xl">📗</span>
        Sign in with Facebook
      </button>
    </div>
  );
}

export default SocialLogin;
