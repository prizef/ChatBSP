using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChatBSP.Providers
{
    public class SqlDataProvider : IDataProvider
    {
        static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public void ExecuteProcedure(
            string procedureName,
            Action<SqlParameterCollection> inputParamMapper = null,
            Action<SqlDataReader> rowMapper = null,
            Action<SqlParameterCollection> outputParamMapper = null
            )
        {

            using (var con = new SqlConnection(connectionString))
            {
                con.Open();

                var cmd = con.CreateCommand();

                cmd.CommandText = procedureName;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                if (inputParamMapper != null)
                {
                    inputParamMapper(cmd.Parameters);
                }

                if (rowMapper != null)
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            rowMapper(reader);
                        }
                    }
                }
                else
                {
                    cmd.ExecuteNonQuery();
                }

                if (outputParamMapper != null)
                {
                    outputParamMapper(cmd.Parameters);
                }
            }
        }
    }
}