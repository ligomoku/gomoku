using Microsoft.CodeAnalysis.CSharp.Testing;
using Microsoft.CodeAnalysis.Diagnostics;
using Microsoft.CodeAnalysis.Testing;
using Microsoft.CodeAnalysis.Testing.Verifiers;

namespace GomokuServer.Analyzer.UnitTests;

public abstract class AnalyzerTestBase<TAnalyzer> where TAnalyzer : DiagnosticAnalyzer, new()
{
	protected CSharpAnalyzerTest<TAnalyzer, NUnitVerifier> CreateAnalyzerTest(string sourceCode, params DiagnosticResult[] expectedDiagnostics)
	{
		var test = new CSharpAnalyzerTest<TAnalyzer, NUnitVerifier>
		{
			TestCode = sourceCode
		};

		test.ExpectedDiagnostics.AddRange(expectedDiagnostics);
		return test;
	}
}
