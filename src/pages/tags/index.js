import React from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Tags | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1" style={{ marginBottom: "6rem" }}>
            <h1 className="title is-size-2 is-bold-light">Tags</h1>
            <ul className="taglist">
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Helmet>
        <script type="text/javascript" src="../static/ab-testing-client.js"></script>
        <script
          dangerouslySetInnerHTML={{
            _html: ` const client = new AbTestingClient("5d6c1c8e1b57d1001ebb74b6"); client.init();`
          }}
        />
      </Helmet>
    </section>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
