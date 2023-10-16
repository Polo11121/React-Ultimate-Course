type NumResultsProps = {
  resultsCount: number;
};

export const NumResults = ({ resultsCount }: NumResultsProps) => (
  <p className="num-results">
    Found <strong>{resultsCount}</strong> results
  </p>
);
