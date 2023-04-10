import React from "react";
import PropTypes from "prop-types";

export default function TableRow({
  index,
  owner,
  stargazers_count,
  forks,
  open_issues,
  name,
}) {
  const { login, avatar_url } = owner;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={avatar_url}
            alt={`Avatar for ${login}`}
          />
          <a href={`https://github.com/${login}/${name}`}>{name}</a>
        </div>
      </td>
      <td>{stargazers_count}</td>
      <td>{forks}</td>
      <td>{open_issues}</td>
    </tr>
  );
}

TableRow.propTypes = {
  index: PropTypes.number.isRequired,
  owner: PropTypes.object.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  forks: PropTypes.number.isRequired,
  open_issues: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
