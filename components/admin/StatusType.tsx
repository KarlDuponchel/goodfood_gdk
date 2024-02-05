type StatusTypeProps = {
  myStatus: string;
};

export const StatusType = ({ myStatus }: StatusTypeProps) => {
  const color =
    myStatus === "Créée"
      ? "bg-yellow-300"
      : myStatus === "En cours"
        ? "bg-blue-300"
        : "bg-green-300";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold text-white ${color}`}
    >
      {myStatus}
    </span>
  );
};
