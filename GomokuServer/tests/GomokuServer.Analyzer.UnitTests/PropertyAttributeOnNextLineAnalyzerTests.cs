using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Testing;

namespace GomokuServer.Analyzer.UnitTests;

public class PropertyAttributeOnNextLineAnalyzerTests : AnalyzerTestBase<PropertyAttributeOnNextLineAnalyzer>
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

		var expectedDiagnostic = new DiagnosticResult("GOMOKU001", DiagnosticSeverity.Error)
			.WithMessage("Property 'Name' should be placed on a new line after its attribute.")
			.WithSpan(3, 4, 3, 85)
			.WithArguments("Name");

		var test = CreateAnalyzerTest(sourceCode, expectedDiagnostic);

		// Act & Assert
		await test.RunAsync();
	}

	[Test]
	public async Task PropertyOnNewLineAfterAttribute_ShouldNotReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"public class TestClass
		{
			[System.ComponentModel.DataAnnotations.Required]
			public string Name { get; set; }
		}";

		// No expected diagnostics for this valid case
		var test = CreateAnalyzerTest(sourceCode);

		// Act & Assert
		await test.RunAsync();
	}
}
