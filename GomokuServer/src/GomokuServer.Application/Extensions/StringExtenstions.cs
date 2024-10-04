namespace GomokuServer.Application.Extensions;

public static class StringExtenstions
{
	public static string ToCamelCase(this string str)
	{
		if (string.IsNullOrWhiteSpace(str))
		{
			return str;
		}

		str = str.Trim();

		if (str.Length == 1)
		{
			return str.ToLower();
		}

		return char.ToLower(str[0]) + str.Substring(1);
	}
}
