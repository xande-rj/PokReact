import './tabela.css';

const TabelaSimples = ({ data }:any) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Method</th>
          <th>Lv</th>
        </tr>
      </thead>
      <tbody>
        {data.map((move:any, index:any) => (
          <tr key={index}>
            <td>{move.name}</td>
            <td>{move.type}</td>
            <td>{move.power}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaSimples;
