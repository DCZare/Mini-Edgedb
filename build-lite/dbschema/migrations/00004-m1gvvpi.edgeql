CREATE MIGRATION m1gvvpia4qba6do4jnvxt74bcdv3nrpv427amhhtt6q46dxdslbu4q
    ONTO m1zv4jjzdr2vevymopwkxvey2l6pdjge55a2ximpuysrhcjzavpfpa
{
  ALTER TYPE default::Work {
      CREATE OPTIONAL PROPERTY cited_by_fbwalls_count: std::str;
  };
};
