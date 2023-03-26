import { useState } from 'react';
import { TypedIcon } from 'typed-design-system';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <TypedIcon icon="trash_19" />
    </div>
  );
}

export default App;
