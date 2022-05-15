/*
we encourage to have a dedicated route called `/mock-api` on your frontend app where you can import Mockman and test them 
*/

const Mockman = require('mockman-js');
export function MockmanTest() {
  return (
    <div className="MockAPI">
      <Mockman />
    </div>
  );
}
