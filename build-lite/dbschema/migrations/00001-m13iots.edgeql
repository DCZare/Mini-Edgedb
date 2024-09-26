CREATE MIGRATION m13iotslqskpzb7ggkplrsvvlz755dop7wjb63pri4t6seihgzjq5q
    ONTO initial
{
  CREATE TYPE default::Author {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Work {
      CREATE MULTI LINK authors: default::Author;
      CREATE OPTIONAL PROPERTY abstract: std::str;
      CREATE OPTIONAL PROPERTY cited_by_accounts_count: std::str;
      CREATE OPTIONAL PROPERTY cited_by_patents_count: std::str;
      CREATE OPTIONAL PROPERTY cited_by_posts_count: std::str;
      CREATE OPTIONAL PROPERTY cited_by_tweeters_count: std::str;
      CREATE REQUIRED PROPERTY doi: std::str;
      CREATE REQUIRED PROPERTY journal: std::str;
      CREATE OPTIONAL PROPERTY pmid: std::float64;
      CREATE OPTIONAL PROPERTY title: std::str;
      CREATE OPTIONAL PROPERTY url: std::str;
  };
};
