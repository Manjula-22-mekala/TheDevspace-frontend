const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">

      {/* IMAGE SECTION (FIXED HEIGHT) */}
      <figure className="h-64 overflow-hidden">
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* CONTENT SECTION */}
      <div className="card-body text-left gap-2">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-80">
            {age}, {gender}
          </p>
        )}

        <p className="mt-4">
          {about}
        </p>

        <div className="card-actions justify-center mt-6">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
