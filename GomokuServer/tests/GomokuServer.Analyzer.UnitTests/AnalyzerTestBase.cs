using Microsoft.CodeAnalysis.CSharp.Testing;
using Microsoft.CodeAnalysis.Diagnostics;
using Microsoft.CodeAnalysis.Testing;

namespace GomokuServer.Analyzer.UnitTests;

public abstract class AnalyzerTestBase<TAnalyzer> where TAnalyzer : DiagnosticAnalyzer, new()
{
	protected CSharpAnalyzerTest<TAnalyzer, DefaultVerifier> CreateAnalyzerTest(string sourceCode, params DiagnosticResult[] expectedDiagnostics)
	{
		var test = new CSharpAnalyzerTest<TAnalyzer, DefaultVerifier>
		{
			TestCode = sourceCode
		};

		test.ExpectedDiagnostics.AddRange(expectedDiagnostics);
		return test;
	}
}
