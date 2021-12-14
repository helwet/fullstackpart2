const Header = (props) => {
  return <h1>{props.coursename}</h1>;
};
const Course = (course) => {
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return <>{props.parts.map((o) => Part(o))}</>;
};

const Part = (props) => {
  return (
    <>
      <p>
        <b>{props.name}</b>
        <br />
        excercises: {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  const counts = props.parts.map((o) => o.exercises);
  const sum = counts.reduce((sum, b) => {
    //ompa helvetin hyva tapa tehda yksinkertaisesta asiasta vaikeampaa lukea nama reduce ja map
    return (sum += b);
  }, 0);
  return <b>total amount of excercises: {sum}</b>;
};
export default Course;
