export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center">
      <img
        src={photoURL}
        alt={displayName}
        className="w-9 h-9 rounded-full mr-2"
      />
      {/* 항상 숨어있다가, md 사이즈부터 보여주기 */}
      <span className="hidden md:block">{displayName}</span>
    </div>
  )
}
