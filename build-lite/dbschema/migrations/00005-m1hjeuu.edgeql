CREATE MIGRATION m1hjeuugdc2it346zdl43tpjrcvpwjfiskjbtiggamyxqeazskvebq
    ONTO m1gvvpia4qba6do4jnvxt74bcdv3nrpv427amhhtt6q46dxdslbu4q
{
  ALTER TYPE default::Work {
      CREATE OPTIONAL PROPERTY author_position: std::str;
      CREATE OPTIONAL PROPERTY institution_name: std::str;
      CREATE OPTIONAL PROPERTY year: std::str;
  };
};
