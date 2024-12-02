using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Testing;

namespace GomokuServer.Analyzer.UnitTests;

public class AsyncMethodSuffixAnalyzerTests : AnalyzerTestBase<AsyncMethodSuffixAnalyzer>
{
	[Test]
	public async Task AsyncMethodWithoutAsyncSuffix_ShouldReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"using System.Threading.Tasks;

		public class TestClass
		{
			public async Task DoWork() { }
		}";

		var expectedDiagnostic = new DiagnosticResult("GOMOKU002", DiagnosticSeverity.Error)
			.WithMessage("Method 'DoWork' is async but does not end with 'Async'.")
			.WithSpan(5, 22, 5, 28)
			.WithArguments("DoWork");

		var test = CreateAnalyzerTest(sourceCode, expectedDiagnostic);

		// Act & Assert
		await test.RunAsync();
	}

	[Test]
	public async Task TaskReturningMethodWithoutAsyncKeyword_ShouldReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"using System.Threading.Tasks;

		public class TestClass
		{
			public Task DoWork() => Task.CompletedTask;
		}";

		var expectedDiagnostic = new DiagnosticResult("GOMOKU002", DiagnosticSeverity.Error)
			.WithMessage("Method 'DoWork' is async but does not end with 'Async'.")
			.WithSpan(5, 16, 5, 22) // Highlights 'DoWork'
			.WithArguments("DoWork");

		var test = CreateAnalyzerTest(sourceCode, expectedDiagnostic);

		// Act & Assert
		await test.RunAsync();
	}

	[Test]
	public async Task AsyncMethodWithAsyncSuffix_ShouldNotReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"using System.Threading.Tasks;

		public class TestClass
		{
			public async Task DoWorkAsync() { }
		}";

		// No expected diagnostics for this valid case
		var test = CreateAnalyzerTest(sourceCode);

		// Act & Assert
		await test.RunAsync();
	}

	[Test]
	public async Task TaskReturningMethodWithAsyncSuffix_ShouldNotReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"using System.Threading.Tasks;

		public class TestClass
		{
			public Task DoWorkAsync() => Task.CompletedTask;
		}";

		// No expected diagnostics for this valid case
		var test = CreateAnalyzerTest(sourceCode);

		// Act & Assert
		await test.RunAsync();
	}

	[Test]
	public async Task NonTaskReturningMethod_ShouldNotReportDiagnostic()
	{
		// Arrange
		const string sourceCode =
		@"public class TestClass
		{
			public void DoWork() { }
		}";

		// No expected diagnostics for this valid case
		var test = CreateAnalyzerTest(sourceCode);

		// Act & Assert
		await test.RunAsync();
	}
}
