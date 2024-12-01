using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Testing;

namespace GomokuServer.Analyzer.UnitTests;

public class Tests : AnalyzerTestBase<AttributePropertyLineAnalyzer>
{
	[Test]
	public async Task PropertyOnSameLineAsAttribute_ShouldReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"public class TestClass
		{
			[System.ComponentModel.DataAnnotations.Required] public string Name { get; set; }
		}";

		var expectedDiagnostic = new DiagnosticResult("GOMOKU004", DiagnosticSeverity.Error)
			.WithMessage("Property 'Name' should be placed on a new line after its attribute.")
			.WithSpan(3, 48, 3, 76)
			.WithArguments("Name");

		var test = CreateAnalyzerTest(sourceCode, expectedDiagnostic);

		// Act & Assert
		await test.RunAsync();
	}
}
