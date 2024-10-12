using System.Reflection;

namespace GomokuServer.Utils.Extensions;

public static class ReflectionExtensions
{
	public static bool IsNullableType(this PropertyInfo property)
	{
		return new NullabilityInfoContext().Create(property).WriteState is NullabilityState.Nullable;
	}
}
