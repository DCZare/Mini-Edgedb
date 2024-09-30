CREATE MIGRATION m17lrppk5oxekj5xfhyttg3izq3agnqcd7mosxuz7h22fhy2xajxla
    ONTO m13iotslqskpzb7ggkplrsvvlz755dop7wjb63pri4t6seihgzjq5q
{
  ALTER TYPE default::Author {
      CREATE MULTI LINK works := (SELECT
          default::Work
      FILTER
          (default::Work.authors = default::Author)
      );
  };
};
