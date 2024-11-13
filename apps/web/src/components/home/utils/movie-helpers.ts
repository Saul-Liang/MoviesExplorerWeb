export function getVoteAsPercentage(vote_average: number): string {
  return Math.round(vote_average * 10).toString() + "%";
}

export function getVoteColor(vote_average: number): string {
  if (vote_average > 7) {
    return "text-green-600";
  } else if (vote_average > 4) {
    return "text-orange-600";
  } else {
    return "text-red-600";
  }
}
