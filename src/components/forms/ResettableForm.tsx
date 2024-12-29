import React, { useState } from 'react';

interface ResetFormProps {
  key: number;
  resetAction: () => void;
}

const ResettableForm = ({ render }: { render: (props: ResetFormProps) => React.JSX.Element }) => {
  const [version, setVersion] = useState(0);

  const resetAction = () => {
    setVersion(prevVersion => prevVersion + 1);
  };

  return render({ key: version, resetAction });
};

export default ResettableForm;
